import { LightningElement } from 'lwc';

export default class PageHeader extends LightningElement {
    /*constructor() {
        super();
        //this.addEventListener('wheel', this.handleWheel);
        //this.template.addEventListener('wheel', this.handleWheel);
      }*/
    rendered = 0;
    top; right; bottom; left; width; height;
    t = 13;
    shouldResizeHeader = 0;
    shouldResetHeader = 0;

    connectedCallback() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    renderedCallback() {
        if (!this.rendered) {
            console.log('renderedCallback called');
            let e = this.template.querySelector('div.myheader');
            console.log('querySelector called ', e);
            let rect = e.getBoundingClientRect();
            
            this.rendered = 1;
        }

    }


    handleScroll() {
        let e = this.template.querySelector('div.myheader');
        let rect = e.getBoundingClientRect();
        //console.log('rect  ' + JSON.stringify(rect));
        //console.log('document.body.scrollTop  ' + document.body.scrollTop);
        //console.log('window.scrollY  ' + window.scrollY);
        if (rect.y < 90) {
            this.shouldResizeHeader = 1;
        }
        if (window.scrollY == 0) {
            console.log();
            this.shouldResetHeader = 1;
        }
        if (this.shouldResizeHeader) {
            e.style.left = "0px";
            e.style.right = "0px";
            e.style.position = "fixed";
            e.style.zIndex = "98";
            e.style.transform = "translate3d(0, -" + this.t + "px, 0)";
            this.shouldResizeHeader = 0;

        }
        if (this.shouldResetHeader) {
            console.log('reset header');
            this.reset();
            this.shouldResetHeader=0;
        }
    }
    reset() {
        let e = this.template.querySelector('div.myheader');
        e.style.left = "";
        e.style.right = "";
        e.style.position = "";
        e.style.zIndex = "";
        e.style.transform = "translate3d(0px, 0px, 0px)";
    }


}