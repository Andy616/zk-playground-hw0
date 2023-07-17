# API server that interact with smart contracts

Hardhat + Express

## Set up local environment
Requirements:
* node: 18.16.1
* npm: 9.5.1

```shell
npm install
npm run compile  # this compiles smart contracts
npm run dev  # run ts-node directly
```

## Set up local ETH node

* Bring up client:
  ```shell
  docker-compose -f compose/docker-compose.yaml up -d
  ```
    * After node successfully starts up, we can see 10 default accounts
      at [compose/data/accounts.json](compose/data/accounts.json), replace [env](.env)'s ACCOUNT with one of the private
      keys, then run `npm run dev` to start server .


* Shut down client:
  ```shell
  docker-compose -f compose/docker-compose.yaml down
  ```

## Test interact with contracts

1. Deploy contract:
    * Request:
        ```
        POST http://localhost:8500/api/deploy
        ```
    * Response:
        ```json
        {
            "contract_address": "0x4Eb48e3d094ffE63d97b8Cc40F0D5A4b0c3329e2"
        }
        ```

2. Set value
    * Request:
        ```
        POST http://localhost:8500/api/contract/set_my_var
        {
            "contract_address": "0x4Eb48e3d094ffE63d97b8Cc40F0D5A4b0c3329e2",
            "value": "123"
        }
        ```
    * Response:
        ```json
        {
            "hash": "0x11e7be148d972e9a6cb6d7d2f8fa42c25d89289f38d6832226f19f07dbe726d7",
            "type": 2,
            "accessList": [],
            "blockHash": "0x40502d1b75718eb52d8ba058333faac0a7572977fa4a7cddc6852ce319b10c3b",
            "blockNumber": 9,
            "transactionIndex": 0,
            "confirmations": 1,
            "from": "0x26C62E57222f69632d31ec7F05F3b40F6494e025",
            "gasPrice": {
                "type": "BigNumber",
                "hex": "0x12965177"
            },
            "maxPriorityFeePerGas": {
                "type": "BigNumber",
                "hex": "0x00"
            },
            "maxFeePerGas": {
                "type": "BigNumber",
                "hex": "0x17863f1a"
            },
            "gasLimit": {
                "type": "BigNumber",
                "hex": "0xc79b"
            },
            "to": "0x4Eb48e3d094ffE63d97b8Cc40F0D5A4b0c3329e2",
            "value": {
                "type": "BigNumber",
                "hex": "0x00"
            },
            "nonce": 8,
            "data": "0x324f1f7d000000000000000000000000000000000000000000000000000000000000007b",
            "r": "0x933cd5f9c600c76f2b3c602d2bb9877d19ccbb9580e76684270ef4094cbac3b0",
            "s": "0x1f60bf26647e1fb36aaa63c49ece6544250b1142e7702733fc421088197bea83",
            "v": 1,
            "creates": null,
            "chainId": 1337
        }
        ```

3. Get value:
    * Request:
        ```
        POST http://localhost:8500/api/contract/get_my_var
        {
            "contract_address": "0x4Eb48e3d094ffE63d97b8Cc40F0D5A4b0c3329e2"
        }
        ```
    * Response:
        ```json
        {
            "type": "BigNumber",
            "hex": "0x7b"
        }
        ```
