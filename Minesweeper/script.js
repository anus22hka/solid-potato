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

    for(let i=0; i < squares.length; i++){
        let total=0
        const isLeftEdge=(i % width === 0)
        const isRightEdge=(i % width === width - 1)

        console.log(squares)
        if(squares[i].classList.contains('valid')) {
        if (i > 0 && !isLeftEdge && squares[i-1].classList.contains('bomb')) total++
        if (i > 9 && !isRightEdge && squares[i+1-width].classList.contains('bomb')) total++
        if (i > 10 && squares[i-width].classList.contains('bomb')) total++
        if (i > 11 && !isLeftEdge && squares[i-width-1].classList.contains('bomb')) total++
        if (i < 99 && !isRightEdge && squares[i + 1].classList.contains('bomb')) total++
        if (i < 90 && !isLeftEdge && squares[i-1+ width].classList.contains('bomb')) total++
        if (i < 88 && !isRightEdge && squares[i+1+width].classList.contains('bomb')) total++
        if (i < 89 && squares[i+ width].classList.contains('bomb')) total++
        squares[i].setAttribute('data', total)
        }

    }
