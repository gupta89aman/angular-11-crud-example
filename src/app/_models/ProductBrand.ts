
interface ProductBrand {
  pbId: string,
  Brand: string,
  ProductName: string
  MRP: number,
  Quantity: number,
  //1: KG, 2: Per Piece
  Unit: string,
  UnitPrice: number,
  GST: number,
  GST_Amt: number,
  Net_Amt: number,
  BuyPrice: number,
  SellPrice: number,
  Seller: string
}


interface ResponseData<T> {
  code: number,
  data: T
}

interface Seller {
  SellerId: string,
  CompanyName: string,
  Name: string,
  MbNo: string[]
}

export {
  ResponseData, ProductBrand, Seller
}
