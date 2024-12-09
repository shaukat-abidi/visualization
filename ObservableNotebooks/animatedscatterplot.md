# Animated-Scatterplot-v1 

```js
// Code dependency
//const year = view(d3.sort(d3.union(nations.map((d) => d.year))), {loop: false, delay: 1000 / 24})
//const year = view(Inputs.range([1800, 2009], {step:1, loop: false, delay: 1000 / 24} ));


const nationsPromise = FileAttachment("nations.csv").csv({ typed: true });

// Once the file is loaded, execute the code
nationsPromise.then(nations => {
  // Your code that depends on the loaded data goes here
  console.log(nations);

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


  // Observable button
  const year = view(Inputs.range([1850,2000], {
    step:1,
    //loop: false,
    //delay: 1000 / 24
    })
    );

  const chart = Plot.plot({
    grid: true,
    x: { type: "log", domain: [200, 100e3] },
    y: { domain: [15, 85], ticks: 8 },
    color: { legend: true },
    marks: [
        Plot.dot(nations, Plot.groupZ({
            x: lastDefined,
            y: lastDefined,
            r: lastDefined,
            stroke: "last"
        }, {
            filter: (d) => d.year <= year,
            x: "income",
            y: "lifeExpectancy",
            r: "population",
            stroke: "region",
            z: "name"
        }))
    ]
});

display(chart);
          
});


```

