const template = document.createElement('template')
template.innerHTML = /* Html */`
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
    <button type="button" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h2 class="h6 mb-1"><slot name="header"></slot></h2>
              <small><slot name="small"></slot></small>
            </div>
            <p class="mb-1 small text-body-secondary"><slot name="paragraph"></slot></p>
            <small class="text-body-secondary"><slot name="small2"></slot></small>
          </button>

`

class ResourceItem extends HTMLElement {
    #selected = false;

    constructor(){
        super();
         this.attachShadow({mode:'open'});
    }

    connectedCallback(){
        this.addEventListener('click', this.clickHandler)
        this.render();
        this.syncAttributes();
        this.#selected = false;
    }
    render(){
        this.shadowRoot.append(template.content.cloneNode(true));
        document.addEventListener('resource-select', (e) => this.onSelect(e))
    }
    syncAttributes(){
       this.setSlot('header', this.getAttribute('header'));
        this.setSlot('small', this.getAttribute('small'));
        this.setSlot('paragraph', this.getAttribute('paragraph'));
        this.setSlot('small2', this.getAttribute('small2'));
    }
    setSlot(name,  value){
        if (!value) return;

        let el = this.shadowRoot.querySelector(`[slot="${name}"]`);
        if (!el){
            el = document.createElement('span');
            el.slot = name;
            this.appendChild(el);
        }
        el.textContent = value;

    }
    clickHandler = ()=> {
        
    
        this.dispatchEvent(new CustomEvent('resource-select', {
            bubbles: true,
            composed: true,
            detail: {
                id: this.id
            }

        }));


    }
    onSelect(e){
        this.#selected = (e.detail.id === this.id);
        this.updateSelect();
    }

    updateSelect(){
        const btn = this.shadowRoot.querySelector('button');

        btn.classList.toggle('active', this.#selected);
        
    }

}

customElements.define('resource-item', ResourceItem);