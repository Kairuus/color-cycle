import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'color-cycle';

  btnTitle = 'Start'

  onlyHexWarning: boolean = true
  onlyDecWarning: boolean = true
  stopWarning: boolean = true

  redDecimalValue = 0
  greenDecimalValue = 0
  blueDecimalValue = 0

  switch(addRed: string, addGreen: string, addBlue: string){

    let inputs = document.querySelectorAll('input')

    if(this.btnTitle === 'Stop'){
      this.btnTitle = 'Start'
      inputs.forEach((input) => {
        input.addEventListener('click', () => {
          this.stopWarning = true
        })
        input.readOnly = false
        this.stopWarning = true
      })

    }else{
      this.btnTitle = 'Stop'
      inputs.forEach((input) => {
        input.addEventListener('click', () => {
          this.stopWarning = false
        })
        input.readOnly = true
      })
    }

      let intervalID = setInterval(() =>  {

        let colorBox = document.getElementById('colorBox')
        let color = colorBox?.style.backgroundColor

        const teste = document.getElementById('teste')
        let testColor = teste?.style.backgroundColor;

        if(color !== undefined){
          const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if(!match){
          throw new Error('Ocorreu um erro, tente novamente')
        }

        let r = parseInt(match[1], 10) + Number(addRed);
        let g = parseInt(match[2], 10) + Number(addGreen);
        let b = parseInt(match[3], 10) + Number(addBlue);

        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));

        const hexR = r.toString(16).padStart(2, '0');
        const hexG = g.toString(16).padStart(2, '0');
        const hexB = b.toString(16).padStart(2, '0');

        let finalColor = `#${hexR}${hexG}${hexB}`;
        console.log(finalColor)

          if(colorBox){
            colorBox.style.backgroundColor = finalColor
          }
        }

        if(this.btnTitle === 'Start'){
          clearInterval(intervalID)
        }
      }, 250);
  }
  validate(value: string, item: HTMLElement){
    let regex = /^[0-9A-Fa-f]*$/

    if (!regex.test(value)){
      item.style.borderColor = 'red';
      this.onlyHexWarning = false
    }else{
      item.style.borderColor = 'black';
      this.onlyHexWarning = true
    }
  }

  validateAdd(value: string, item: HTMLElement){
    let regex = /^[0-9]*$/

    if(!regex.test(value)){
      item.style.borderColor = 'red'
      this.onlyDecWarning = false
    }else{
      item.style.borderColor = 'black'
      this.onlyDecWarning = true
    }
  }

}


