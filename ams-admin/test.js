function test() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1111)
        }, 2000);
    })
}

test().then((aa) => {
    console.log(aa)
})

