resource "cloudflare_record" "admin" {
  name    = "wcepr"
  proxied = true
  ttl     = 1
  type    = "CNAME"
  value   = data.external.env.result["WCEPR_CNAME"]
  zone_id = data.external.env.result["CLOUDFLARE_ZONE_ID"]
}

