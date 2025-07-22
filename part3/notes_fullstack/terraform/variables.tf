# Define variables for reusability and clarity
variable "gcp_project_id" {
  description = "The Google Cloud project ID."
  type        = string
}

variable "github_repo" {
  description = "The GitHub repository in 'owner/repo' format."
  type        = string
  default     = "Mr-Fred/react_learning"
}

variable "service_account_id" {
  description = "The ID for the service account."
  type        = string
  default     = "notes-deploy-sa"
}

variable "workload_identity_pool_id" {
  description = "The ID for the Workload Identity Pool."
  type        = string
  default     = "notes-app-pool"
}

variable "workload_identity_provider_id" {
  description = "The ID for the Workload Identity Provider."
  type        = string
  default     = "github-provider"
}

variable "github_repo_owner" {
  description = "The owner of the GitHub repository."
  type        = string
  default     = "Mr-Fred"
}

variable "gar_location" {
  description = "The location for the Artifact Registry repository."
  type        = string
  default     = "us-central1"
}

variable "gar_repository_id" {
  description = "The ID for the Artifact Registry repository, matching the SERVICE_NAME in the workflow."
  type        = string
  default     = "notes-app-service"
}