import { sleep, group, check } from 'k6'
import { parseHTML } from 'k6/html'
import { Counter } from 'k6/metrics'
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js'
import { assert, getEmbededResources } from '../utils/helper.js'


const errors = new Counter('errors')

const session = new Httpx({
  baseURL: 'https://sii.pl',
  headers: {
    'host': 'sii.pl',
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'accept-language': 'en-US,en;q=0.5',
    'accept-encoding': 'gzip, deflate, br',
    'connection': 'keep-alive',
    'upgrade-insecure-requests': '1',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1'
  },
  timeout: 20000
})

export default function main() {
  let response
  let status

  group('Użytkownik przechodzi na stronę główną', function () {
    response = session.get('/')
    status = check(response, {
      'status is 200': (r) => r.status === 200,
      'title is proper': (r) => r.body.includes('Rozwiązania i usługi IT, inżynierii i BPO - Sii Polska')
    })
    getEmbededResources(response.body)
    assert(status)
    sleep(randomIntBetween(3, 10))
  })

  group('Użytkownik przechodzi do sekcji "Szkolenia"', function () {
    response = session.get('/szkolenia/')
    status = check(response, {
      'status is 200': (r) => r.status === 200,
      'body includes proper title': (r) => r.body.includes('Szkolenia | Sii Polska')
    })
    getEmbededResources(response.body)
    assert(status)
    sleep(randomIntBetween(3, 10))
  })

  let trainingName
  let trainingHref
  group('Użytkownik przechodzi do wyszukiwarki szkoleń', function () {
    response = session.get('/szkolenia/wyszukiwarka-szkolen/')
    status = check(response, {
      'status is 200': (r) => r.status === 200,
      'body includes proper title': (r) => r.body.includes('Wszystkie szkolenia | Sii Polska')
    })
    trainingName = parseHTML(response.body).find('h3.sii-o-training-box__title').first().text()
    trainingHref = parseHTML(response.body).find('a.sii-a-icon-button.-invert').first().attr('href')
    getEmbededResources(response.body)
    assert(status)
    sleep(randomIntBetween(3, 10))
  })

  group('Użytkownik wyszukuje szkolenie o nazwie "[trainingName]"', function () {
    response = session.get(trainingHref)
    status = check(response, {
      'status is 200': (r) => r.status === 200,
      'body includes proper title': (r) => r.body.includes(trainingName)
    })
    getEmbededResources(response.body)
    assert(status)
  })
}
