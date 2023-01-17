import axios from '../utilis/axios';
import { STORE_NAME, STORE_ACCESS_TOKEN, POST_METHOD, HEADERS_CONTENT_TYPE } from '../constants/endpoints';

export const getProduct = async (productId) => {
    const data = JSON.stringify({
        query: `{
  product(id: "gid://shopify/Product/${productId}") {
    id
    title
    createdAt
    handle
    priceRange{
        minVariantPrice {
            amount
        }
    }
    featuredImage{
            url
    }
    options{
        id
        name
        values
    }
    variants(first: 100) {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            id
          }
        }
      }
    description
    totalInventory
    tags
  }
}`,
        variables: {}
    });

    const config = {
        method: POST_METHOD,
        url: `https://${STORE_NAME}.myshopify.com/api/2022-04/graphql.json`,
        headers: {
            'Content-Type': HEADERS_CONTENT_TYPE,
            'X-Shopify-Storefront-Access-Token': STORE_ACCESS_TOKEN
        },
        data: data
    };
    let product = {};
    let otherProduct = {};
    await axios(config)
        .then((response) => {
            product = response?.data?.data?.product;
            otherProduct = product?.otherProduct;
        })
        .catch((error) => {
            return error;
        });
    return {
        id: product?.id,
        title: product?.title,
        price: product?.priceRange?.minVariantPrice?.amount,
        numberOfTest: product?.numberOfTest,
        image: product?.image,
        description: product?.description,
        features: product?.features,
        variants: product?.variants?.edges,
        otherProduct: {
            id: otherProduct?.id,
            title: otherProduct?.title,
            subTitle:
                otherProduct?.subTitle,
            price: otherProduct?.price,
            numberOfTest: otherProduct?.numberOfTest,
            image: otherProduct?.image,
            description: otherProduct?.description,
        }
    }
}

export const getProducts = async () => {
    const data = JSON.stringify({
        query: `{
  products(first: 50) {
    edges {
      cursor
      node {
        availableForSale
        compareAtPriceRange {
            maxVariantPrice {
                amount
                currencyCode
            }
            minVariantPrice {
                amount
                currencyCode
            }
        }
        title
        description
        id
        variants(first: 50) {     
            edges {
                cursor
                node {
                    availableForSale
                    title
                    id
                }
            }
        }
      }
    }
  }
}`,
        variables: {}
    });

    const config = {
        method: POST_METHOD,
        url: `https://${STORE_NAME}.myshopify.com/api/2022-04/graphql.json`,
        headers: {
            'Content-Type': HEADERS_CONTENT_TYPE,
            'X-Shopify-Storefront-Access-Token': STORE_ACCESS_TOKEN,
        },
        data: data
    };
    const products = [];
    await axios(config)
        .then((response) => {
            products = response.data;
        })
        .catch((error) => {
            return error;
        });
    return products;
}

export const createCheckout = async (args) => {
    console.log("checkout")
    const data = JSON.stringify({
        query: `mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
            id
            buyerIdentity {
                countryCode
            }
            shippingAddress {
                address1
            }
            lineItems (first: 50) {     
                edges {
                    node {
                        id
                        quantity
                    }
                }
            }
            totalPriceV2 {
                amount
                currencyCode
            }
            requiresShipping
            # availableShippingRates {
            #     ready
            #     shippingRates {
            #         handle
            #         priceV2 {
            #             amount
            #         }
            #         title
            #     }
            # }
        }
        checkoutUserErrors {
          field, message, code
        }
      }
    }`,
        variables: { "input": { "email": args.email, "buyerIdentity": { "countryCode": "CA" }, "lineItems": [{ "quantity": 1, "variantId": "gid://shopify/ProductVariant/40540840525978" }], "shippingAddress": { "address1": "na", "city": "Toronto", "country": "Canada", "province": "ON", "lastName": "smith", "zip": "M1R 0E9" } } }
    });

    const config = {
        method: 'post',
        url: `https://${STORE_NAME}.myshopify.com/api/2022-04/graphql.json`,
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': STORE_ACCESS_TOKEN
        },
        data: data
    };
    let newCheckout = {};
    await axios(config)
        .then((response) => {
            newCheckout = response?.data;
        })
        .catch((error) => {
            console.log(error);
        });
    return newCheckout
}

export const getCustomerAccessToken = async () => {
    const data = JSON.stringify({
      query: `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
          customerAccessToken {
              accessToken
              expiresAt
          }
          customerUserErrors { 
              field
              message
              code
          }
      }
  }`,
      variables: { "input": { "email": "bvladyka@intrivo.com", "password": "5hopify" } }
    });
  
    const config = {
      method: 'post',
      url: `https://${STORE_NAME}.myshopify.com/api/2022-04/graphql.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STORE_ACCESS_TOKEN,
      },
      data: data
    };
    let customerAccessToken = {};
    await axios(config)
      .then((response) => {
        console.log(response.data);
        customerAccessToken = JSON.stringify(response?.data?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken);
      })
      .catch((error) => {
        console.log(error);
      });
      return customerAccessToken;
  }

  export const createCart = async (args) => {
    const {payload} = args;
    const data = {
      query: `mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
          cart {
              id
              lines(first: 50) {     
                  edges {
                      node {
                          attributes {
                              key
                              value
                          }
                          id
                          quantity
                      }
                  }
              }
          }
          userErrors {
              field
              message
              code
          }
      }
  }`,
      variables: { input: { buyerIdentity: { customerAccessToken: payload.replaceAll("\"", "") }, "lines": { "quantity": args?.quantity, 
      "merchandiseId": args?.product?.variants[0]?.node?.id, 
      "attributes": { "key": "id", "value": args?.product?.variants[0]?.node?.id } 
    } } }
    };
    const config = {
      method: POST_METHOD,
      url: `https://${STORE_NAME}.myshopify.com/api/2022-04/graphql.json`,
      headers: {
        'Content-Type': HEADERS_CONTENT_TYPE,
        'X-Shopify-Storefront-Access-Token': STORE_ACCESS_TOKEN,
      },
      data: data
    };
    let newCart = {};
    await axios(config)
      .then((response) => {
        newCart = response?.data;
      })
      .catch((error) => {
        return error;
      });
      return newCart
  }
  
  export const getCart = async (cartId) => {
    const data = JSON.stringify({
      query: `{
        cart(id: "${cartId}") {
            buyerIdentity {
                customer {
                    email
                }
            }
            estimatedCost {
                totalAmount {
                    amount
                    currencyCode
                }
                subtotalAmount{
                  amount
                  currencyCode
              }
              totalDutyAmount{
                  amount
                  currencyCode
              }
              totalTaxAmount{
                  amount
                  currencyCode
              }
            }
            id
            note
            updatedAt
            lines(first: 50) {     
                edges {
                    node {
                        attributes {
                            key
                            value
                        }
                        id
                        quantity
                    }
                }
            }
            discountCodes{
              applicable
              code
          }
        }
    }`,
      variables: {}
    });
    const config = {
      method: 'post',
      url: `https://${STORE_NAME}.myshopify.com/api/2022-04/graphql.json`,
      headers: { 
        'Content-Type': 'application/json', 
        'X-Shopify-Storefront-Access-Token': STORE_ACCESS_TOKEN,
      },
      data : data
    };
    let cart = {};
    await axios(config)
    .then(function (response) {
      cart = response?.data;
    })
    .catch(function (error) {
      console.log(error);
    });
    return cart;
  }