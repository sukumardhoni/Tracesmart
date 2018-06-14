import { Pipe, PipeTransform ,Injectable} from '@angular/core';

@Pipe({
  name: 'productFilter',
})

@Injectable()
export class ProductFilterPipe implements PipeTransform {
    
  transform(value: any, item:any) {
    console.log('in the pipe',value)
    console.log('in the pipe',item)
    var fiterArr = []
    for(var i=0; i<value.length;i++){
      if(value[i].productCategory == item){
        fiterArr.push(value[i] )
      }
      if(value[i].productName == item){
        fiterArr.push(value[i] )
      }
      // if(value[i].createdBy == item){
      //   fiterArr.push(value[i] )
      // }
    }
    return fiterArr;
  }
}
