import { sleep, group, check } from 'k6'
import { parseHTML } from 'k6/html'
import { Counter } from 'k6/metrics'
import http from 'k6/http'
import { randomIntBetween, randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js'
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js'
import { assert, getEmbededResources } from '../utils/helper.js'


const errors = new Counter('errors')

const ARTICLES = [
  'Testing i kontrola jakości',
  'Hi-tech, elektronika i inżynieria przemysłowa',
  'Wprowadzenie do testów wydajnościowych REST API z wykorzystaniem jMeter',
  'Zostań Testerem Automatyzującym Tosca',
  'Motoryzacja, Kolej i Aeronautyka'
]

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

  let articleName
  let articleHref
  group('Użytkownik wyszukuje jeden z 5 zdefiniowanych wcześniej artykułów', function () {
    articleName = randomItem(ARTICLES)
    response = session.get(`/wyszukiwarka/all/${articleName}`)
    articleHref = parseHTML(response.body)
      .find('h3.sii-m-card-item-simple__content__title')
      .first()
      .parent('div.sii-m-card-item-simple__content')
      .parent('a')
      .attr('href')
    status = check(response, {
      'status is 200': (r) => r.status === 200,
      'body includes article': (r) => r.body.includes(articleName)
    })
    getEmbededResources(response.body)
    assert(status)
    sleep(randomIntBetween(3, 10))
  })

  group('Użytkownik klika w wyszukany artykuł', function () {
    response = http.get(`${articleHref}`)
    status = check(response, {
      'status is 200': (r) => r.status === 200,
      'body includes articleName': (r) => r.body.includes(articleName)
    })
    getEmbededResources(response.body)
    assert(status)
  })
}
