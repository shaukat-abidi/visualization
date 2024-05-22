# Animated-Scatterplot-v2 

```js
const nations = FileAttachment("nations.csv").csv({ typed: true });
```


```js
nations
```

```js
const button_range = d3.sort(d3.union(nations.map((d) => d.year)));
```

```js
console.log(button_range);
 // Observable button
const year = view(Inputs.range([1800, 2009], {
  step: 1,
  loop: false,
  delay: 1000 / 24
  })
  );

var lastDefined = ({
  reduceIndex(I, X) {
      for (let i = I.length - 1; i >= 0; --i) {
        const x = X[I[i]];
        if (x != null) {
            return x;
        }
    }
  }
});


```
