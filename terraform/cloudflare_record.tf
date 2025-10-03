resource "cloudflare_dns_record" "wcepr" {
  name    = "wcepr"
  proxied = true
  ttl     = 1
  type    = "AAAA"
  content = data.external.env.result["WCEPR_AAAA"]
  zone_id = data.external.env.result["CLOUDFLARE_ZONE_ID"]
}

