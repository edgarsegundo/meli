import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BubbleNode } from './bubbleNode';

@Component({
  selector: 'app-dialogue-builder',
  templateUrl: './dialogue-builder.component.html',
  styleUrls: ['./dialogue-builder.component.scss']
})
export class DialogueBuilderComponent implements OnInit, AfterViewInit {

  // @ViewChild("target1", {read: ElementRef, static: true}) target1ref: ElementRef; // gets #target1
  
  //container = document.querySelector(".js-app-bubbles-editor");

  bubbleIndex = 0;
  app: any;
  bubbleNodes:BubbleNode[] = [];
  bubbleNodeCurrent:any = undefined;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.init();
  }

//   init({ // userOpts
//     bubbleContainer: 'js-app-bubbles-editor'
// });

  init() {

    this.app = document.querySelector(".js-app-bubbles-editor");

    
    // this.createNewBubble();
  
    // _ee.on('dialogue-bubbles-editor:request:reset', (doneFn, createOneBubble) => {
    //     helpFuncs.reset(doneFn);
    //     if (createOneBubble) {
    //         helpFuncs.createNewBubble();
    //     };
    // });
  
    // _ee.on('dialogue-bubbles-editor:request:add', (txtEn, txtPt) => helpFuncs.createNewBubble(txtEn, txtPt));
    // _ee.on('dialogue-bubbles-editor:request:string', (doneFn) => helpFuncs.toString(doneFn));
    // _ee.on('dialogue-bubbles-editor:request:first:bubble:focus', () => helpFuncs.setFocus(0));
  
    // const appBubblesEditorScroll = document.querySelector('.js-app-bubbles-editor-scroll-b');
    // let innerHeight = window.innerHeight - 100; // 100 ?
    // appBubblesEditorScroll.setAttribute("style",`height:${innerHeight}px`);
    // appBubblesEditorScroll.style.height = `${innerHeight}px`;
  };

  onBubbleClick(index:number, goTo:string) {
    switch(goTo) {
      case 'add':
        alert('add');
    break;
      case 'remove':
        //this.bubbleNodes[index].bubbleBlockElem.parentNode.removeChild(this.bubbleNodes[index].bubbleBlockElem);        

        if (index < this.bubbleNodes.length - 1) {
          //  this.bubbleNodes[index + 1].bubbleBlockElem.parentNode.removeChild(this.bubbleNodes[index+1].bubbleBlockElem);
            this.bubbleIndex -= 1;
            this.bubbleNodes.splice(index+1, 1);
        }

        this.bubbleIndex -= 1;
        this.bubbleNodes.splice(index, 1);
        this.bubbleNodeCurrent = this.bubbleNodes[this.bubbleIndex]; 
        break;
    }
  }

  createNewBubble() {
    this.bubbleIndex += 1;

    this.app?.appendChild(this.createBubbleElem(0));

    // if (this.bubbleNodes.length % 2 === 0 && this.bubbleNodes.length !== 0) {
    //   let elem:any = document.getElementById(`add${this.bubbleNodes.length}`);
    //   elem.addEventListener('click', this.onBubbleClick.bind(elem, this.bubbleNodes.length, 'add'));
    //   elem = document.getElementById(`remove${this.bubbleNodes.length}`);
    //   elem.addEventListener('click', this.onBubbleClick.bind(elem, this.bubbleNodes.length, 'remove'));
    // }

    this.bubbleNodeCurrent = this.createBubbleNode(this.bubbleNodes.length);
    this.bubbleNodes.push(this.bubbleNodeCurrent);
    // helpFuncs.attachEvents(bubbleNodeCurrent.en.textareaElem);
   
    //this.bubbleNodeCurrent.textareaElem.focus();
  }

  createElementFromHTML(htmlString:string):any {
    const div:any = document.createElement('div');
    div.innerHTML = htmlString.trim();
    // Change this to div.childNodes to support multiple top-level nodes
    return div.firstChild;
  }

  createBubbleNode(index:number):BubbleNode {
    return {
      blockElem: document.querySelector(`.js-chat-bubble-b__${index}`),
      
    };
  }

  createBubbleElem(index:number):any {
      return this.createElementFromHTML(
        `<div bubble-index="${index}" class="bubble bubble--${index % 2 === 0 ? 'me' : 'you'} speech-bubble--${index % 2 === 0 ? 'me' : 'you'} chat-bubble-b js-chat-bubble-b__${index}">
            ${index % 2 === 0 && index !== 0 ? `<div class="bubble-buttons-b">
                                    <div id="add${index}" class="bubble-button-b" title="Adicionar nova bolha.">
                                        <img src="../assets/images/chat-plus-outline.svg"/>
                                    </div>&nbsp;&nbsp;
                                    <div id="remove${index}" class="list-page-article-button-b" title="Remover Bolha.">
                                        <img src="../assets/images/chat-remove-outline-20px.svg"/>
                                    </div>
                                </div>` : ""}
            <div class="speech-bubble top-animated-placeholder">
                <label>
                    <textarea bubble-index="${index}" textarea-index="0" class="test js-chat-bubble-en__textarea__${index}" rows="3" cols="200" placeholder=" "></textarea>
                    <span>Digite a frase em inglês</span>
                </label>
            </div>
            <div class="speech-bubble top-animated-placeholder">
                <label>
                    <textarea bubble-index="${index}" textarea-index="1" class="js-chat-bubble-pt__textarea__${index}" rows="2" cols="200" placeholder=" "></textarea>
                    <span>Digite a frase em português</span>
                </label>
            </div>
        </div>`
    );
  }

}