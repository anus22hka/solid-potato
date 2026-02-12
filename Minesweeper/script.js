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
