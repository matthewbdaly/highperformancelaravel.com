export async function GET(): Promise<Response> {
	const baseUrl = process.env.URL ? new URL(process.env.URL) : new URL(`http://localhost:${process.env.PORT || 3000}`);
	const data = {
		"subject": "acct:posts@highperformancelaravel.com",
		"links": [
			{
				"rel": "self",
				"type": "application/activity+json",
				"href": `${baseUrl}actor`
			}
		]
	};
	return new Response(JSON.stringify(data), { headers: { "content-type": "application/json" } })
}
