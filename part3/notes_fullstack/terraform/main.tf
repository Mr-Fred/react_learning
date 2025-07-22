# 1. Create the dedicated Service Account
resource "google_service_account" "notes_deploy_sa" {
  project      = var.gcp_project_id
  account_id   = var.service_account_id
  display_name = "Notes App Deployer Service Account"
  depends_on   = [google_project_service.iam]
}

# 2. Grant necessary roles to the Service Account
resource "google_project_iam_member" "artifact_writer" {
  project = var.gcp_project_id
  role    = "roles/artifactregistry.writer"
  member  = google_service_account.notes_deploy_sa.member
}

resource "google_project_iam_member" "run_admin" {
  project = var.gcp_project_id
  role    = "roles/run.admin"
  member  = google_service_account.notes_deploy_sa.member
}

resource "google_project_iam_member" "sa_user" {
  project = var.gcp_project_id
  role    = "roles/iam.serviceAccountUser"
  member  = google_service_account.notes_deploy_sa.member
}

# 3. Create the Workload Identity Pool
resource "google_iam_workload_identity_pool" "notes_pool" {
  project                   = var.gcp_project_id
  workload_identity_pool_id = var.workload_identity_pool_id
  display_name              = "Notes App Pool"
  description               = "Identity pool for the Notes application"
  depends_on                = [google_project_service.iam]
}

# 4. Create the Workload Identity Provider for GitHub
resource "google_iam_workload_identity_pool_provider" "github_provider" {
  project                            = var.gcp_project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.notes_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = var.workload_identity_provider_id
  display_name                       = "GitHub OIDC Provider"
  attribute_mapping = {
    "google.subject"       = "assertion.sub",
    "attribute.repository" = "assertion.repository",
  }
  attribute_condition = "assertion.repository_owner==\"${var.github_repo_owner}\" && assertion.repository==\"${var.github_repo}\""
  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
  depends_on = [google_iam_workload_identity_pool.notes_pool]
}

# 5. Link the GitHub repository to the Service Account
resource "google_service_account_iam_member" "wif_user" {
  service_account_id = google_service_account.notes_deploy_sa.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.notes_pool.name}/attribute.repository/${var.github_repo}"
}

# 6. Create an Artifact Registry repository to store the Docker images
resource "google_artifact_registry_repository" "notes_repo" {
  project       = var.gcp_project_id
  location      = var.gar_location
  repository_id = var.gar_repository_id
  description   = "Docker repository for the notes application"
  format        = "DOCKER"
  depends_on    = [google_project_service.artifactregistry]
}