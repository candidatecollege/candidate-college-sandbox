const splitName = (data: any, split: number) => {
  let name = data.split(" ")

  name = name.map((word: string) => word.replace(":", ""))
  name = name.length > split ? `${name.slice(0, split).join(" ")}` : data
  
  return name
}

export default splitName