## Configurations

### Gateway Configuration

#### Get Configurations of a Gateway

```
const gatewayName = 'customGatewayName';
socket.on(`configurations.gateway.${gatewayName}`, response => console.log('gateway configs: ', response.data));
socket.emit('configurations.gateway.get', {name: gatewayName});
```

#### Get Configurations of a Storefront

```
const storefrontName = 'customStorefrontName';
socket.on(`configurations.storefront.${storefrontName}`, response => console.log('storefront configs: ', response.data));
socket.emit('configurations.storefront.get', {name: storefrontName});
```