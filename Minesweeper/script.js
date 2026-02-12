document.addEventListener('DOMContentLoaded', function() {
   const grid=document.querySelector('.grid')
   const flagsleft=document.querySelector('#flags-left')
   const result = document.querySelector('#result')
    const width=10
    let BombAmount=20
    let flags=0
    let squares=[]
    let isGameOver = false

  console.log(grid);

    //board
   function creatBoard(){
    flagsleft.innerHTML= BombAmount

    const Bombarray=Array(BombAmount).fill('bomb')
    const emptyarray=Array(width * width - BombAmount).fill('valid')
    const gamearray=emptyarray.concat(Bombarray)
    const shuffledarray=gamearray.sort(() => Math.random() - 0.5)

       for(let i=0; i<width*width; i++){
        const square = document.createElement('div')
        square.id=i
        square.classList.add(shuffledarray[i])
        grid.appendChild(square)
        squares.push(square)

        square.addEventListener('click', function(){
            click(square)

        })

        square.addEventListener('contextmenu', function(){
            addFlag(square)

        })
        
    }
