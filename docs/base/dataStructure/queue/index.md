# ðéåï¼queueï¼
## éåçæ¦å¿µåç¹ç¹
æ æ¯ä¸ç§åè¿ååºçæ°æ®ç»æ, åªç¨ shift å push å®æå¢å çâæ°ç»âã
- åªåè®¸ä»å°¾é¨æ·»å åç´ 
- åªåè®¸ä»å¤´é¨ååºåç´ 
## æ çå¸¸ç¨æä½
```
const queue = []
queue.push('1')
queue.push('2')
queue.push('3')
while(queue.length){
    let top = queue[0]
    console.log(top)
    queue.shift()
}
```