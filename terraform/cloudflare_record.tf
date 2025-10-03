resource "cloudflare_dns_record" "wcepr" {
  name    = "wcepr"
  proxied = true
  ttl     = 1
  type    = "CNAME"
  content = data.external.env.result["WCEPR_CNAME"]
  zone_id = data.external.env.result["CLOUDFLARE_ZONE_ID"]
}

