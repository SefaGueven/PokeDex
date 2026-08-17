let allPkms= [{
name: "pkm1",
type: "grass"
},
]

function renderNames() {
    for (let i = 0; i < allPkms.length; i++) {
    document.getElementById('list').innerHTML+=`<h1 class="bg_${allPkms[i].type}">${allPkms[i].name}</h1>`
        
    }
    
}
function getColor(type) {
    switch (type) {
        case "grass":
            return "#12541";
        default:
            return "#12541";
    }
    
} 