//Display dropdown
fetch('http://localhost:3000/grade/labs')
    .then(response => response.json())
    .then(labs => {
        const selection = document.getElementById('labs');
        for (const lab of labs){
            const op = document.createElement('option');
            op.value = lab;
            op.textContent = lab;
            selection.appendChild(op);
        }
    })

//Get AI response
const form = document.getElementById('form');
const output = document.getElementById('output');

form.addEventListener('submit', async(e) => { 
    e.preventDefault();

    const formData = new FormData(form);
    const lab = document.getElementById('labs').value;
    formData.append('lab', lab);
    try{
        const res = await fetch("http://localhost:3000/grade", { //Defaults to GET
            method: "POST",
            body: formData,
        });
        
        const reply = await res.json();
        //.split('\n').join('<br ')
        output.innerHTML = `
            <h4> Score: ${reply.score} </h4>
            <pre>${reply.comments}</pre>
        `;
        //pre tag for autoformatting

        console.log(reply.comments);
    }catch(err){
        output.inner = err;
    }
})