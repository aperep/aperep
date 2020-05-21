function generate(){
  let students = document.getElementById("students").value;
  let billets = document.getElementById("billets").value;
  let phrase = document.getElementById("phrase").value.trim();
  let salt = 'sfdlkjoitj4t3458ergodhgweory489';
  var md = forge.md.sha256.create();
  let answers = new Array();
  
  let div = document.getElementById("answers");
  while (div.firstChild) div.removeChild(div.lastChild);
  
  for (let i = 1; i <= students; i++){
    md.update(phrase + salt + billets + students + i);    
    let num = md.digest().getInt(16)%billets+1;
    answers.push([i, num])
    let p = document.createElement("p");  
    p.innerHTML = "Студент №"+i+" получает билет №"+num;
    div.appendChild(p);
  }
    

}
