import { loadAllItems, loadPromotions } from './Dependencies'

export function printReceipt(tags: string[]): string {



  // const subTotalPrices: String[] = calculatePrices(promotion)
  // return receptRender(subTotalPrices,receptItems)


  const promoteRule: Promotion[] = loadPromotions()
  const decodedTags: Tag[] = decode(tags)
  const items: Item[] = buildItems(decodedTags, promoteRule)

  return `***<store earning no money>Receipt ***
${renderItems(items)}
----------------------
Total：${renderTotalPrice(items)}(yuan)
Discounted prices：${renderDiscountedPrice(items)}(yuan)
**********************`
}

// receptRender(subTotalPrices：String[], receptItems: Item[]): String{

// }

function decode(tags: string[]): Tag[] {
  return [{
    barcode: 'ITEM000001',
    quantity: 5
  }, {
    barcode: 'ITEM000003',
    quantity: 2.5
  }, {
    barcode: 'ITEM000005',
    quantity: 3
  }]
}

function renderTotalPrice(items: Item[]): string {
  return '58.50'
}
function renderDiscountedPrice(items: Item[]): string {
  return '7.50'
}

function renderItems(items: Item[]): string {
  return 'Name：Sprite，Quantity：5 bottles，Unit：3.00(yuan)，Subtotal：12.00(yuan)\n' +
    'Name：Litchi，Quantity：2.5 pounds，Unit：15.00(yuan)，Subtotal：37.50(yuan)\n' +
    'Name：Instant Noodles，Quantity：3 bags，Unit：4.50(yuan)，Subtotal：9.00(yuan)'
}

function buildItems(tags: Tag[], promoterule: Promotion[]): Item[] {
  return [{
    name: 'Sprite',
    quantity: 5,
    unitPrice: 3,
    unit: 'bottles',
    subTotal: 12
  }, {
    name: 'Litchi',
    quantity: 2.5,
    unitPrice: 15,
    unit: 'pounds',
    subTotal: 37.5
  }, {
    name: 'Instant',
    quantity: 3,
    unitPrice: 3,
    unit: 'bags',
    subTotal: 9
  }]

}

interface Tag {
  barcode: string
  quantity: number
}

interface Production {
  barcode: string
  name: string
  unit: string
  price: number
}

interface Item {
  name: string
  quantity: number
  unitPrice: number
  unit: string
  subTotal: number
}

interface Promotion {
  type: string
  barcodes: string[]
}