# k6-boilerplate

A repository containing boilerplate code for the k6 project described in an eight-part series dedicated to learning k6 from scratch. The project includes best practices and integration with influxDB and Grafana.

## Installation

```bash
npm install
```

## Running

Build image from dockerfile:

```
docker build -t k6-with-npm .
```

Run influxDB and Grafana

```bash
docker-compose up -d influxdb grafana
```

Run test

```bash
sudo docker-compose run --rm k6 run wyszukiwanie-artykulu:smoke
```

## Series

English:

1. [Performance under control with k6 – introduction](https://sii.pl/blog/en/performance-under-control-with-k6-introduction/)
2. [Performance under control with k6 – recording, parametrization, and running the first test scenario](https://sii.pl/blog/en/performance-under-control-with-k6-recording-parametrization-and-running-the-first-test-scenario/)
3. [Performance under control with k6 – metrics, quality thresholds, tagging](https://sii.pl/blog/en/performance-under-control-with-k6-metrics-quality-thresholds-tagging/)
4. [Performance under control with k6 – additional configurations types of scenario models and executors](https://sii.pl/blog/en/performance-under-control-with-k6-additional-configurations-types-of-scenario-models-and-executors/)
5. soon
6. soon
7. soon
8. soon

Polish:

1. [Wydajność pod kontrolą z k6 - Co skłania mnie do wyboru k6?](https://sii.pl/blog/wydajnosc-pod-kontrola-co-sklania-mnie-do-wyboru-k6/?category=development-na-miekko&tag=k6%2Cprzeglad-narzedzi%2Ctesty-wydajnosci%2Ctosca%2Czalety-i-wady&fbclid=IwAR1b6f88-H7RfuQhLlro1T8Rig6Bs7G8IsaM77CvU8crmV1UrMW_dW-GE6A)
2. [Wydajność pod kontrolą z k6 – nagrywanie, parametryzacja i uruchamianie pierwszego scenariusza testowego](https://sii.pl/blog/wydajnosc-pod-kontrola-z-k6-nagrywanie-parametryzacja-i-uruchamianie-pierwszego-scenariusza-testowego/)
3. [Wydajność pod kontrolą z k6 – metryki, progi jakości, tagowanie](https://sii.pl/blog/wydajnosc-pod-kontrola-z-k6-metryki-progi-jakosci-tagowanie/)
4. [Wydajność pod kontrolą z k6 – dodatkowe konfiguracje, typy modeli scenariuszy oraz executorów](https://sii.pl/blog/wydajnosc-pod-kontrola-z-k6-dodatkowe-konfiguracje-typy-modeli-scenariuszy-oraz-executorow/)
5. soon
6. soon
7. soon
8. soon
