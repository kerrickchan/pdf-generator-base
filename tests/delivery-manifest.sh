curl -0 -Lo delivery-manifest.pdf -H "Content-Type: application/json" -d @../inputs/delivery-manifest.json -X POST http://localhost:8080/api/v1/pdf/delivery-manifest
