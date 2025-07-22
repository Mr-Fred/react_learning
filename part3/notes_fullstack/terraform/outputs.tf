# Output the values needed for GitHub Secrets
output "gcp_sa_email" {
  value       = google_service_account.notes_deploy_sa.email
  description = "The email of the service account to be used in GitHub Secrets."
}

output "gcp_wif_provider" {
  value       = google_iam_workload_identity_pool_provider.github_provider.name
  description = "The full name of the WIF provider to be used in GitHub Secrets."
}