import { v4 as uuidv4 } from "uuid"

const topics: any = {}
export function subscribe(topic: any, fn: any) {
  if (!topics[topic]) topics[topic] = {}
  const id = uuidv4()
  
  topics[topic][id] = fn
  return () => {
    topics[topic][id] = null
    delete topics[topic][id]
  }
}
export function publish(topic: any, args: any) {
  if (!topics[topic]) return
  Object.values(topics[topic]).forEach((fn: any) => {
    if (fn) fn(args)
  })
}