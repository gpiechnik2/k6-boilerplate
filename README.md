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

1. TODO

Polish:

1. [Wydajność pod kontrolą z k6 - Co skłania mnie do wyboru k6?](https://sii.pl/blog/wydajnosc-pod-kontrola-co-sklania-mnie-do-wyboru-k6/?category=development-na-miekko&tag=k6%2Cprzeglad-narzedzi%2Ctesty-wydajnosci%2Ctosca%2Czalety-i-wady&fbclid=IwAR1b6f88-H7RfuQhLlro1T8Rig6Bs7G8IsaM77CvU8crmV1UrMW_dW-GE6A)
