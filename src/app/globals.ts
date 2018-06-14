import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  public APIHOST = 'http://pog.aheadrace.com:8080/api/';
  role;
  authToken:'';
  firstName
  userId:'';
  middleName
  lastName  
  regionID
  regionName
  state
  userDesignation
  userdistributorID
  userdistributorName
  selectedDistributors
  distId
  distName
  catdId
  catdName
  selectedQuantity
  scannedProductCode
  scannedProductQuantity
  prodId
  prodName
  salesOrderNumber
  requestStockOrderNumber
}