/**
 * Shopify Storefront GraphQL Queries & Mutations
 */

export const PRODUCT_FRAGMENT = `
  fragment ProductDetails on Product {
    id
    title
    handle
    description
    descriptionHtml
    vendor
    productType
    tags
    availableForSale
    totalInventory
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    compareAtPriceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
        }
      }
    }
    variants(first: 50) {
      edges {
        node {
          id
          title
          sku
          availableForSale
          quantityAvailable
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
    collections(first: 5) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`

export const GET_ALL_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetAllProducts($first: Int = 100, $query: String, $sortKey: ProductSortKeys, $reverse: Boolean) {
    products(first: $first, query: $query, sortKey: $sortKey, reverse: $reverse) {
      edges {
        node {
          ...ProductDetails
        }
      }
    }
  }
`

export const GET_PRODUCT_BY_HANDLE_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      ...ProductDetails
    }
  }
`

export const GET_COLLECTIONS_QUERY = `
  query GetCollections($first: Int = 20) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            url
            altText
          }
        }
      }
    }
  }
`

export const GET_COLLECTION_PRODUCTS_QUERY = `
  ${PRODUCT_FRAGMENT}
  query GetCollectionProducts($handle: String!, $first: Int = 100) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image {
        url
        altText
      }
      products(first: $first) {
        edges {
          node {
            ...ProductDetails
          }
        }
      }
    }
  }
`

export const CART_FRAGMENT = `
  fragment CartDetails on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              sku
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              image {
                url
                altText
              }
              product {
                id
                title
                handle
                vendor
                productType
              }
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`

export const CREATE_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation CreateCart($input: CartInput) {
    cartCreate(input: $input) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const ADD_LINES_TO_CART_MUTATION = `
  ${CART_FRAGMENT}
  mutation AddLinesToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const UPDATE_CART_LINES_MUTATION = `
  ${CART_FRAGMENT}
  mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const REMOVE_CART_LINES_MUTATION = `
  ${CART_FRAGMENT}
  mutation RemoveCartLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartDetails
      }
      userErrors {
        field
        message
      }
    }
  }
`

export const GET_CART_QUERY = `
  ${CART_FRAGMENT}
  query GetCart($id: ID!) {
    cart(id: $id) {
      ...CartDetails
    }
  }
`
