# BE-Q3

Gitlab https://gitlab.com/nessica98/test-api-3

### **Vaidation**

**Create API**

- POST `/product`
- Support create product with product name and product detail that support TH / EN language

Spec

|  |  | type | required |
| --- | --- | --- | --- |
| productName |  | Object |  |
|  | th | string | ✅ |
|  | en | string | ✅ |
| productDescription |  | Object |  |
|  | th | string | ✅ |
|  | en | string | ✅ |

**Search API**

- GET `/product`
- Use query params to support search and pagination
- sample param `products?page=1&size=5&keyword=test`
    - page : which page to query (default = 1)
    - size: the number of record per page (default = 10)
    - keyword: part of product name to query

**Database Design**

![multilang.png](multilang.png)

- Table : Product → Keep product record
- Table : NameLanguage → Keep each product name and support multiple languages
    - use product id as FK to refer to a product
- Table : DescLanguage → Keep each product name and support multiple languages
    - use product id as FK to refer to a product

NameLanguage and DescLanguage table have the same schema.

**Testing Strategy**

- Unit test - Handle unit test by test module in Nest.js. Each services and util function should be covered with unit test and have coverage with whole functionality
- Integration test - Handle both API functionality that consists of Search and Create API
    - Search API
        - Pagination can get data correctly
        - Able to use search keyword and find data correctly
    - Create API
        - Check that can create product to database correctly (product name and description by multiple language can be also kept in database)
- End-to-end test - Handle test with other services that work with API or Front end service that can get / create data correctly along with the service