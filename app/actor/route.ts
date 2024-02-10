export async function GET(): Promise<Response> {
	const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);
		const data = {
		"@context": [
			"https://www.w3.org/ns/activitystreams",
			"https://w3id.org/security/v1"
		],
		"id": `${baseUrl}actor`,
		"type": "Application",
		"preferredUsername": "posts",
		"inbox": `${baseUrl}inbox`,
		"publicKey": {
			"id": `${baseUrl}actor#main-key`,
			"owner": `${baseUrl}actor`,
			"publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAya8PG/z9AabqxouY2cUW\nIHgfxk8KfaUHoIS3wCo+8X+A0RpeFaro2r6eoLhw6M3jD4JuxZXjvPtDF8e56YHX\nYWNgbSGHaAtADfDZ8hs/vkUreNmt/w2p4IlVvbzUpXl1ZKEQAOKzPqlskQeaJVgL\n66hTWohU855nxDf9oHhdVMCjUFSGN8ZLUx8dt3LT4Wy6hu0bemPnGirbaYYUS+Wi\nRax+Gn30oQkxDaDok6I+XUZ3mzKDGCRBI4pFWZP9ImadPSaWiw4OqopC+6ReZ2Wg\nzVuTB1zphSozGOd6/qxs1gBaah6kz4jGQSkFm5TQAH1XQlrJxTQYqmGuypSeo571\nnQIDAQAB\n-----END PUBLIC KEY-----"
		}
	}
	return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } })
}
