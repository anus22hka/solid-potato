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
  
   }
   creatBoard()

   function addFlag(square) {
    if(isGameOver) return
    if(!square.classList.contains('checked') && (flags < BombAmount)) {
        if(!square.classList.contains('flag')) {
            square.classList.add('flag')
            flags++
            square.innerHTML = '🚩'
            flagsleft.innerHTML = BombAmount - flags
            checkForWin()
        }

        else{
            square.classList.remove('flag')
            flags--
            square.innerHTML = ''
            flagsleft.innerHTML = BombAmount - flags       
        }
    }
   }

   function click(square) {
    console.log(square)
    if (isGameOver || square.classList.contains('checked') || square.classList.contains('flag')) return

    if(square.classList.contains('bomb')) {
        gameOver()
    }
    else{
        let total=square.getAttribute('data')
        if(total != 0) {
            
            if(total == 1) square.classList.add('one')
            if(total == 2) square.classList.add('two')
            if(total == 3) square.classList.add('three')
            if(total == 4) square.classList.add('four')
                square.innerHTML=total
            return
        
        }
        checkSquare(square)
    }
    square.classList.add('checked')
        
   }

   function  checkForWin() {
    let matches = 0

    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
            matches++
        }

        if(matches === BombAmount){
            result.innerHTML = 'YOU WONN!! 😊'
            isGameOver = true

        }
    }
   }
