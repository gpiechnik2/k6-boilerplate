import { parseHTML } from 'k6/html'
import { fail } from 'k6'
import http from 'k6/http'

  
function assert(response, check, errors, name) {
    if (!check) {
        // couldn't make point from sample: max key length exceeded: 519029 > 65535 - InfluxDB validation
        const responseBody = JSON.stringify(response.body).slice(0, 5000)
        const requestBody = JSON.stringify(response.request.body).slice(0, 5000)
        errors.add(true, {
            name: name,
            error_code: response.error_code,
            request_headers: JSON.stringify(response.request.headers),
            request_cookies: JSON.stringify(response.request.cookies),
            request_method: response.request.method,
            request_body: requestBody,
            response_headers: JSON.stringify(response.headers),
            response_cookies: JSON.stringify(response.cookies),
            response_status: response.status,
            response_body: responseBody,
        })
        fail("Assertion failed")
    }
}
  
function getEmbededResources(body) {
	const req_script = parseHTML(body)
	req_script.find('script').toArray().forEach(function (item) {
		const url = item.attr('src')
		if (url != undefined && url != null && url.toLowerCase().startsWith('http')) {
			http.get(url)
		}
	})
}
  
export {
	assert,
	getEmbededResources
}
