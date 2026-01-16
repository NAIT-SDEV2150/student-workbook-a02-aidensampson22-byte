const template = document.createElement('template');
template.innerHTML = /* Html */ ` 
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<section >
      <div class="card h-100">
        <div class="card-header">
          <strong>Details</strong>
        </div>

        <div class="card-body">
          <h2 class="h5"><slot name="title">Peer Tutoring Centre</slot></h2>
          <p class="text-body-secondary mb-2"><slot name="info">Drop-in tutoring and study support.</slot></p>

          <dl class="row mb-0">
            <dt class="col-4">Category</dt>
            <dd class="col-8"><slot name="category">Academic</slot></dd>

            <dt class="col-4">Location</dt>
            <dd class="col-8"><slot name="location">Building W, Room W101</slot></dd>

            <dt class="col-4">Hours</dt>
            <dd class="col-8"><slot name="times">Mon-Thu 10:00-16:00</slot></dd>

            <dt class="col-4">Contact</dt>
            <dd class="col-8"><slot name="email">tutoring@nait.ca</slot></dd>
          </dl>
        </div>

        <div class="card-footer d-flex gap-2">
          <button class="btn btn-outline-secondary" type="button">Copy email</button>
          <button class="btn btn-outline-primary" type="button">Open map</button>
        </div>
      </div>
    </section>
`;

class ResourceDetails extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode : 'open'});
    }
    connectedCallback(){
        this.render();
 
        
    }
    render(){
        this.shadowRoot.append(template.content.cloneNode(true))
        
    }

    update(data){
      this.setSlot('title', data.title);
      this.setSlot('info', data.summary);
      this.setSlot('category', data.category);
      this.setSlot('times', data.hours);
      this.setSlot('email', data.contact)
    }
    setSlot(name,  value){
        if (!value) return;

        let el = document.querySelector(`[slot="${name}"]`);
        if (!el){
            el = document.createElement('span');
            el.slot = name;
            this.appendChild(el);
        }
        el.textContent = value;

    }
     









    
};
customElements.define('resource-details', ResourceDetails);