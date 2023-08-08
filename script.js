const searchInput = document.querySelector(".search input"),
    search = document.querySelector(".search"),
    modalBackdrop = document.querySelector(".modal-backdrop"),
    modal = modalBackdrop.querySelector(".modal"),
    closebtn = modalBackdrop.querySelectorAll(".close-btn")

search.addEventListener("submit", showPrescription)
closebtn.forEach(btn => {
    btn.onclick = () => {
        modalBackdrop.classList.remove("show")
    }
})
function showPrescription(event) {
    event.preventDefault()
    const searchTerm = searchInput.value;
    fetch("./data.json")
        .then(response => response.json())
        .then(result => {
            const filteredData = result.filter(pres => {
                keywords = pres.keywords.split(', ')
                if(pres.title.toLowerCase() === searchTerm.toLowerCase()) return true;
                let pass = false;
                keywords.forEach(word => {
                    if(word === searchTerm) {
                        pass = true;
                    }
                } )
                return pass;
            })

            if(filteredData.length>0){
                modal.querySelector('.modal-header h1').textContent = `DRUGS YOU CAN USE TO CURE ${filteredData[0].title.toUpperCase()}`;
                modal.querySelector('.modal-body>p>.ailment').textContent = filteredData[0].title;
                const drugList = modal.querySelector('.drugs')
                drugList.innerHTML = ''
                filteredData[0].prescription.forEach(pre => {
                    const drugLi = document.createElement('li')
                    drugLi.textContent = pre
                    drugList.appendChild(drugLi)
                })
                modalBackdrop.classList.add("show")
            }else{
                alert(`No prescription found for the search term "${searchTerm}"`)
            }

        })
        .catch(error => {
            console.error(error)
        })
}
