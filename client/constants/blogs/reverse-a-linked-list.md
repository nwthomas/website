---
title: "(LeetCode #206) Reverse a Linked List"
metaTitle: "(LeetCode #206) Reverse a Linked List"
slug: "reverse-a-linked-list"
metaDescription: "The Reverse a Linked List coding challenge teaches you about singly-linked lists and how to use them."
imageUrl: /blog-assets/reverse-a-linked-list/chains.webp
date: "2022-12-06"
tags:
  - LeetCode
---

<img alt="Chains superimposed against water" src="/blog-assets/reverse-a-linked-list/chains.webp" title="Image by [Mael BALLAND](https://unsplash.com/@mael_balland) on [Unsplash](https://unsplash.com/@christieckim)" width="1152" height="1728">

# Reverse a Linked List

---

> This article originally appeared on [Medium](https://medium.com/@nwthomas/reverse-a-linked-list-leetcode-206-62441622e652). It has received slight edits (since we're all better at our hobbies - like writing - as we get older), but it's still true to its original vision.

---

## Introduction

If you’re looking for a quick walkthrough of an optimal solution to the LeetCode [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) problem, you’re in the right spot.

This is a question in the Blind 75 LeetCode code challenge list, a group of questions put together by a tech lead at Facebook that’s been touted as a great way to prep for interviews.

Don’t beat yourself up too much if you’re here because it gave you a hard time. Everyone has a hard time with coding challenges sometimes.

Let’s get it started!

---

## Understanding the Problem 🕵🏻‍️

The first thing we should always try to do is understand all the rules for our challenge before writing a single line of code (see [Polya’s Problem Solving Techniques](https://math.berkeley.edu/~gmelvin/polya.pdf)):

1. We’ll be given the `head` of a singly-linked list (although the list might be empty)
2. We should reverse the list
3. We should return the reversed list
4. If you haven’t worked with linked lists before as a data structure (or haven’t reversed one before), don’t worry. That’s why we’re here right now.

I’ll be using Python for the answer for this question since it’s a bit like a universal language — whether you prefer JavaScript, Java, Golang, C, or something else, everyone can “kind of” read Python.

We’ll also be jumping straight into an “optimal” solution. If you’re anything like me, you already attempted this problem before searching for an answer. I’m going to make sure you get a good one.

Okay. I think that’s enough housekeeping items for us to get started!

---

## What is a Linked List? ⛓

To start off with, let’s quickly review what a linked list data structure is (and specifically a singly-linked list). That basic understanding will let us understand how we can reverse it.

A linked list is really just a series of nodes that point to each other like this:

<img alt="Singly-linked list example" height="240" src="/blog-assets/reverse-a-linked-list/sll.webp" width="1200">

Each one of these nodes will have a value associated with it along with a pointer to the next node. If we were to write a class for this, it would look like this:

```python
class Node:
    def __init__(self, value, next_node):
        self.value = value
        self.next = next_node
```

We could create a series of these nodes by instantiating one with a value, creating a second one with a value, and then assigning the first node’s `next` value to be the second node. We could repeat this as much as we want to create a “linked list” of nodes.

Makes sense? 🧠

I can hear what you’re thinking. You’re going, “Nate, why would you ever want to store value like this instead of in something like a list data structure??”

I like where your head is at. You should be asking those kinds of questions and trying to understand the why behind anything you learn.

Try stopping for a minute and thinking about how lists work. You can easily add to the end of one (via the push method) in `O(1)` time. If you add to the start, you might think that it’s `O(1)` time as well; it’s actually `O(n)` time since the list has to re-index every value in the list when you add to the start of it.

Additionally, you have to search through the entire list in order to find a specific value to replace (unless you already know the index). If you add or remove a value in the middle of the list, you’ll have to go through the entire re-indexing process again (potentially in `O(n)` time).

With linked lists, you can add (to either the start or the end) and remove values at _any_ point in the list in `O(1)` time because you’re just updating pointers to nodes. It will never re-index because each node is a self-contained unit that merely has a pointer reference to the next node.

It’s worth noting here that the data structure we just discussed above is a _singly_-linked list. The difference is that a _doubly_-linked list would also have a pointer back to the _previous_ node, not just one pointing to the next one like this:

<img alt="Doubly-linked list example" height="240" src="/blog-assets/reverse-a-linked-list/dll.webp" width="1200">

We’d write the code for that like this:

```python
class Node:
  def __init__(self, value, prev_node, next_node):
    self.value = value
    self.prev = prev_node
    self.next = next_node
```

This would allow us to traverse forwards and backwards and be much more useful in the real world. However, we’ll only be using singly-linked lists today because that’s a requirement of the problem we’re looking at.

If this all doesn’t make sense yet, we can jump into actually completing the problem and it will hopefully become really clear in a second!

---

## Reversing Our Linked List 🔄

Now that we’ve reviewed how linked lists work, we can get into actually reversing one!

First, let’s go ahead and set up our initial variables:

```python
def reverse_list(self, head):
    if not head:
        return head

    prev_node = None
    current_node = head
    next_node = head.next

    # ... more coming soon
```

First off, we have to check if `head` does not exist. This is because the problem states that the singly-linked list we’re given might be empty.

Next, we have to track the `prev_node`, `current_node`, and `next_node`.

We’ll iteratively use these with a `while` loop (which we’ll set up soon) in order to reverse our list. Notice that we start `prev_node` with a value of `None`. This is because the last node in our singly linked list points to `None`. If we’re going to reverse the list, our `head` node will need to point to `None` (since it’s going to be the end of this list once we’re done).

Here’s what we need to add next:

```python
def reverse_list(self, head):
    if not head:
        return head

    prev_node = None
    current_node = head
    next_node = head.next

    current_node.next = prev_node

    while next_node:

        # ... more coming soon
```

First, our loop won’t work unless we do a quick assignment:

```python
current_node.next = prev_node
```

This initializes our `current_node.next` value (which is the `head` value root node here) with `None` as its value. We’ve already preserved `current_node.next`’s old value in the variable `next_node`.

Nice.

Next, we setup our `while` loop to run as long as `next_node` is truthy (not `None`). This means our loop will keep running until the last node in the current version of the list has a `next` value of `None`.

Now that this is setup, all that’s left for us to do is write some quick reversal logic inside our `while` loop:

```python
def reverse_list(self, head):
    if not head:
        return head

    prev_node = None
    current_node = head
    next_node = head.next

    current_node.next = prev_node

    while next_node:
          prev_node = current_node
          current_node = next_node
          next_node = current_node.next

          current_node.next = prev_node

    return current_node
```

Boom.

Notice that, for each iteration of our loop, we’re bumping the `current_node` value back to `prev_node`, bumping the `next_node` value to be assigned to `current_node`, setting `next_node` to be the `current_node.next`'s value, and finally doing the same pointer switch of the `current_node`'s next pointer so that it points at the `prev_node`.

Once we’re done, we’ll be at the last node (which is now pointing in reverse back down our reversed singly-linked list). This has become our new root node. We can simply return this at the end of the function.

This entire problem will run in `O(n)` time complexity (since we’re iterating through the list once) and `O(1)` space complexity (since we’re only using a constant number of variables to reverse the singly linked list no matter how long it is).

---

## Conclusion

Great job. How did it go? Did you feel like this one deserved the “easy” title on LeetCode?

Keep an eye out for the rest of these Blind 75 coding challenges articles I’m doing. It’s going to be a fun ride.

Feel free to reach out (using the links below) if you want to talk about coding, cool tech, or anything else (I really like book recommendations).

Thanks for reading. 🔥

Nathan
