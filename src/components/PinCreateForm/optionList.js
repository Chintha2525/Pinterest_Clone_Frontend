const minutes = [];
for (var i = 0; i < 60; i++) {
  minutes.push(i + " minutes");
}
minutes[1] = "1 minute";
var hours = [];
for (var j = 0; j < 10; j++) {
  hours.push(j + " hours");
}
hours[1] = "1 hour";
var serving = [];
for (var k = 0; k <= 60; k++) {
  serving.push(k + " servings");
}
serving[1] = "1 serving";
export { minutes, hours, serving };
