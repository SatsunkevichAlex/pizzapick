import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
    name: 'contentToString'
})
export class ContentToStringPipe implements PipeTransform {
    transform(components: string[], args?: any): string {
        return components.join().replace(/,/g, ", ") + '.';        
    }
}