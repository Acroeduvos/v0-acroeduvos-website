// Coding Problems Database for Compiler Integration
export interface CodingProblem {
    id: string
    title: string
    description: string
    difficulty: 'Easy' | 'Medium' | 'Hard'
    topic: string
    tags: string[]
    starterCode: {
        python: string
        cpp: string
        java: string
        javascript: string
    }
    testCases: {
        input: string
        expectedOutput: string
        isHidden?: boolean
    }[]
    constraints: string[]
    examples: {
        input: string
        output: string
        explanation: string
    }[]
}

export const codingProblems: CodingProblem[] = [
    {
        id: 'two-sum',
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        difficulty: 'Easy',
        topic: 'Arrays',
        tags: ['array', 'hash-table'],
        starterCode: {
            python: `def twoSum(nums, target):
    # Write your code here
    pass

# Test
nums = [2, 7, 11, 15]
target = 9
print(twoSum(nums, target))`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Write your code here
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    int target = 9;
    vector<int> result = twoSum(nums, target);
    cout << "[" << result[0] << ", " << result[1] << "]" << endl;
    return 0;
}`,
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = sol.twoSum(nums, target);
        System.out.println("[" + result[0] + ", " + result[1] + "]");
    }
}`,
            javascript: `function twoSum(nums, target) {
    // Write your code here
}

// Test
const nums = [2, 7, 11, 15];
const target = 9;
console.log(twoSum(nums, target));`
        },
        testCases: [
            { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
            { input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
            { input: '[3,3]\n6', expectedOutput: '[0,1]' }
        ],
        constraints: [
            '2 <= nums.length <= 10^4',
            '-10^9 <= nums[i] <= 10^9',
            'Only one valid answer exists'
        ],
        examples: [
            {
                input: 'nums = [2,7,11,15], target = 9',
                output: '[0,1]',
                explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
            }
        ]
    },
    {
        id: 'reverse-string',
        title: 'Reverse String',
        description: 'Write a function that reverses a string. The input string is given as an array of characters.',
        difficulty: 'Easy',
        topic: 'Strings',
        tags: ['string', 'two-pointers'],
        starterCode: {
            python: `def reverseString(s):
    # Write your code here
    pass

# Test
s = ['h', 'e', 'l', 'l', 'o']
reverseString(s)
print(s)`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

void reverseString(vector<char>& s) {
    // Write your code here
}

int main() {
    vector<char> s = {'h', 'e', 'l', 'l', 'o'};
    reverseString(s);
    for(char c : s) cout << c;
    return 0;
}`,
            java: `class Solution {
    public void reverseString(char[] s) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        char[] s = {'h', 'e', 'l', 'l', 'o'};
        sol.reverseString(s);
        System.out.println(s);
    }
}`,
            javascript: `function reverseString(s) {
    // Write your code here
}

// Test
const s = ['h', 'e', 'l', 'l', 'o'];
reverseString(s);
console.log(s);`
        },
        testCases: [
            { input: "['h','e','l','l','o']", expectedOutput: "['o','l','l','e','h']" },
            { input: "['H','a','n','n','a','h']", expectedOutput: "['h','a','n','n','a','H']" }
        ],
        constraints: [
            '1 <= s.length <= 10^5',
            's[i] is a printable ascii character'
        ],
        examples: [
            {
                input: "s = ['h','e','l','l','o']",
                output: "['o','l','l','e','h']",
                explanation: 'The string is reversed in-place.'
            }
        ]
    },
    {
        id: 'palindrome-number',
        title: 'Palindrome Number',
        description: 'Given an integer x, return true if x is a palindrome, and false otherwise.',
        difficulty: 'Easy',
        topic: 'Math',
        tags: ['math'],
        starterCode: {
            python: `def isPalindrome(x):
    # Write your code here
    pass

# Test
print(isPalindrome(121))
print(isPalindrome(-121))`,
            cpp: `#include <iostream>
using namespace std;

bool isPalindrome(int x) {
    // Write your code here
}

int main() {
    cout << isPalindrome(121) << endl;
    cout << isPalindrome(-121) << endl;
    return 0;
}`,
            java: `class Solution {
    public boolean isPalindrome(int x) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isPalindrome(121));
        System.out.println(sol.isPalindrome(-121));
    }
}`,
            javascript: `function isPalindrome(x) {
    // Write your code here
}

// Test
console.log(isPalindrome(121));
console.log(isPalindrome(-121));`
        },
        testCases: [
            { input: '121', expectedOutput: 'true' },
            { input: '-121', expectedOutput: 'false' },
            { input: '10', expectedOutput: 'false' }
        ],
        constraints: [
            '-2^31 <= x <= 2^31 - 1'
        ],
        examples: [
            {
                input: 'x = 121',
                output: 'true',
                explanation: '121 reads as 121 from left to right and from right to left.'
            }
        ]
    },
    {
        id: 'fizzbuzz',
        title: 'Fizz Buzz',
        description: 'Given an integer n, return a string array answer (1-indexed) where: answer[i] == "FizzBuzz" if i is divisible by 3 and 5, answer[i] == "Fizz" if i is divisible by 3, answer[i] == "Buzz" if i is divisible by 5, answer[i] == i (as a string) if none of the above conditions are true.',
        difficulty: 'Easy',
        topic: 'Math',
        tags: ['math', 'string'],
        starterCode: {
            python: `def fizzBuzz(n):
    # Write your code here
    pass

# Test
print(fizzBuzz(15))`,
            cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<string> fizzBuzz(int n) {
    // Write your code here
}

int main() {
    vector<string> result = fizzBuzz(15);
    for(string s : result) cout << s << " ";
    return 0;
}`,
            java: `import java.util.*;

class Solution {
    public List<String> fizzBuzz(int n) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.fizzBuzz(15));
    }
}`,
            javascript: `function fizzBuzz(n) {
    // Write your code here
}

// Test
console.log(fizzBuzz(15));`
        },
        testCases: [
            { input: '3', expectedOutput: '["1","2","Fizz"]' },
            { input: '5', expectedOutput: '["1","2","Fizz","4","Buzz"]' },
            { input: '15', expectedOutput: '["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]' }
        ],
        constraints: [
            '1 <= n <= 10^4'
        ],
        examples: [
            {
                input: 'n = 3',
                output: '["1","2","Fizz"]',
                explanation: '3 is divisible by 3.'
            }
        ]
    },
    {
        id: 'valid-parentheses',
        title: 'Valid Parentheses',
        description: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
        difficulty: 'Easy',
        topic: 'Stack',
        tags: ['string', 'stack'],
        starterCode: {
            python: `def isValid(s):
    # Write your code here
    pass

# Test
print(isValid("()"))
print(isValid("()[]{}"))
print(isValid("(]"))`,
            cpp: `#include <iostream>
#include <string>
using namespace std;

bool isValid(string s) {
    // Write your code here
}

int main() {
    cout << isValid("()") << endl;
    cout << isValid("()[]{}") << endl;
    cout << isValid("(]") << endl;
    return 0;
}`,
            java: `class Solution {
    public boolean isValid(String s) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.isValid("()"));
        System.out.println(sol.isValid("()[]{}"));
        System.out.println(sol.isValid("(]"));
    }
}`,
            javascript: `function isValid(s) {
    // Write your code here
}

// Test
console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));`
        },
        testCases: [
            { input: '()', expectedOutput: 'true' },
            { input: '()[]{}', expectedOutput: 'true' },
            { input: '(]', expectedOutput: 'false' }
        ],
        constraints: [
            '1 <= s.length <= 10^4',
            's consists of parentheses only \'()[]{}\'.'
        ],
        examples: [
            {
                input: 's = "()"',
                output: 'true',
                explanation: 'The string is valid.'
            }
        ]
    },
    {
        id: 'merge-sorted-arrays',
        title: 'Merge Two Sorted Arrays',
        description: 'You are given two integer arrays nums1 and nums2, sorted in non-decreasing order. Merge nums1 and nums2 into a single array sorted in non-decreasing order.',
        difficulty: 'Easy',
        topic: 'Arrays',
        tags: ['array', 'two-pointers', 'sorting'],
        starterCode: {
            python: `def merge(nums1, nums2):
    # Write your code here
    pass

# Test
print(merge([1,2,3], [2,5,6]))`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

vector<int> merge(vector<int>& nums1, vector<int>& nums2) {
    // Write your code here
}

int main() {
    vector<int> nums1 = {1,2,3};
    vector<int> nums2 = {2,5,6};
    vector<int> result = merge(nums1, nums2);
    for(int n : result) cout << n << " ";
    return 0;
}`,
            java: `import java.util.*;

class Solution {
    public int[] merge(int[] nums1, int[] nums2) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums1 = {1,2,3};
        int[] nums2 = {2,5,6};
        System.out.println(Arrays.toString(sol.merge(nums1, nums2)));
    }
}`,
            javascript: `function merge(nums1, nums2) {
    // Write your code here
}

// Test
console.log(merge([1,2,3], [2,5,6]));`
        },
        testCases: [
            { input: '[1,2,3]\n[2,5,6]', expectedOutput: '[1,2,2,3,5,6]' },
            { input: '[1]\n[]', expectedOutput: '[1]' },
            { input: '[]\n[1]', expectedOutput: '[1]' }
        ],
        constraints: [
            'nums1.length, nums2.length <= 200',
            '-10^9 <= nums1[i], nums2[i] <= 10^9'
        ],
        examples: [
            {
                input: 'nums1 = [1,2,3], nums2 = [2,5,6]',
                output: '[1,2,2,3,5,6]',
                explanation: 'The arrays are merged and sorted.'
            }
        ]
    },
    {
        id: 'maximum-subarray',
        title: 'Maximum Subarray',
        description: 'Given an integer array nums, find the subarray with the largest sum, and return its sum.',
        difficulty: 'Medium',
        topic: 'Dynamic Programming',
        tags: ['array', 'dynamic-programming', 'divide-and-conquer'],
        starterCode: {
            python: `def maxSubArray(nums):
    # Write your code here
    pass

# Test
print(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]))`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxSubArray(vector<int>& nums) {
    // Write your code here
}

int main() {
    vector<int> nums = {-2,1,-3,4,-1,2,1,-5,4};
    cout << maxSubArray(nums) << endl;
    return 0;
}`,
            java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {-2,1,-3,4,-1,2,1,-5,4};
        System.out.println(sol.maxSubArray(nums));
    }
}`,
            javascript: `function maxSubArray(nums) {
    // Write your code here
}

// Test
console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4]));`
        },
        testCases: [
            { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
            { input: '[1]', expectedOutput: '1' },
            { input: '[5,4,-1,7,8]', expectedOutput: '23' }
        ],
        constraints: [
            '1 <= nums.length <= 10^5',
            '-10^4 <= nums[i] <= 10^4'
        ],
        examples: [
            {
                input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
                output: '6',
                explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
            }
        ]
    },
    {
        id: 'binary-search',
        title: 'Binary Search',
        description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.',
        difficulty: 'Easy',
        topic: 'Binary Search',
        tags: ['array', 'binary-search'],
        starterCode: {
            python: `def search(nums, target):
    # Write your code here
    pass

# Test
print(search([-1,0,3,5,9,12], 9))`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    // Write your code here
}

int main() {
    vector<int> nums = {-1,0,3,5,9,12};
    cout << search(nums, 9) << endl;
    return 0;
}`,
            java: `class Solution {
    public int search(int[] nums, int target) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {-1,0,3,5,9,12};
        System.out.println(sol.search(nums, 9));
    }
}`,
            javascript: `function search(nums, target) {
    // Write your code here
}

// Test
console.log(search([-1,0,3,5,9,12], 9));`
        },
        testCases: [
            { input: '[-1,0,3,5,9,12]\n9', expectedOutput: '4' },
            { input: '[-1,0,3,5,9,12]\n2', expectedOutput: '-1' }
        ],
        constraints: [
            '1 <= nums.length <= 10^4',
            '-10^4 < nums[i], target < 10^4',
            'All the integers in nums are unique',
            'nums is sorted in ascending order'
        ],
        examples: [
            {
                input: 'nums = [-1,0,3,5,9,12], target = 9',
                output: '4',
                explanation: '9 exists in nums and its index is 4'
            }
        ]
    },
    {
        id: 'linked-list-cycle',
        title: 'Linked List Cycle',
        description: 'Given head, the head of a linked list, determine if the linked list has a cycle in it.',
        difficulty: 'Easy',
        topic: 'Linked List',
        tags: ['linked-list', 'two-pointers'],
        starterCode: {
            python: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

def hasCycle(head):
    # Write your code here
    pass`,
            cpp: `struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(NULL) {}
};

bool hasCycle(ListNode *head) {
    // Write your code here
}`,
            java: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
        next = null;
    }
}

class Solution {
    public boolean hasCycle(ListNode head) {
        // Write your code here
    }
}`,
            javascript: `function ListNode(val) {
    this.val = val;
    this.next = null;
}

function hasCycle(head) {
    // Write your code here
}`
        },
        testCases: [
            { input: '[3,2,0,-4]\n1', expectedOutput: 'true' },
            { input: '[1,2]\n0', expectedOutput: 'true' },
            { input: '[1]\n-1', expectedOutput: 'false' }
        ],
        constraints: [
            'The number of nodes in the list is in the range [0, 10^4]',
            '-10^5 <= Node.val <= 10^5'
        ],
        examples: [
            {
                input: 'head = [3,2,0,-4], pos = 1',
                output: 'true',
                explanation: 'There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).'
            }
        ]
    },
    {
        id: 'climbing-stairs',
        title: 'Climbing Stairs',
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
        difficulty: 'Easy',
        topic: 'Dynamic Programming',
        tags: ['math', 'dynamic-programming', 'memoization'],
        starterCode: {
            python: `def climbStairs(n):
    # Write your code here
    pass

# Test
print(climbStairs(2))
print(climbStairs(3))`,
            cpp: `#include <iostream>
using namespace std;

int climbStairs(int n) {
    // Write your code here
}

int main() {
    cout << climbStairs(2) << endl;
    cout << climbStairs(3) << endl;
    return 0;
}`,
            java: `class Solution {
    public int climbStairs(int n) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        System.out.println(sol.climbStairs(2));
        System.out.println(sol.climbStairs(3));
    }
}`,
            javascript: `function climbStairs(n) {
    // Write your code here
}

// Test
console.log(climbStairs(2));
console.log(climbStairs(3));`
        },
        testCases: [
            { input: '2', expectedOutput: '2' },
            { input: '3', expectedOutput: '3' },
            { input: '5', expectedOutput: '8' }
        ],
        constraints: [
            '1 <= n <= 45'
        ],
        examples: [
            {
                input: 'n = 2',
                output: '2',
                explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps'
            }
        ]
    },
    {
        id: 'best-time-stock',
        title: 'Best Time to Buy and Sell Stock',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction.',
        difficulty: 'Easy',
        topic: 'Arrays',
        tags: ['array', 'dynamic-programming'],
        starterCode: {
            python: `def maxProfit(prices):
    # Write your code here
    pass

# Test
print(maxProfit([7,1,5,3,6,4]))`,
            cpp: `#include <iostream>
#include <vector>
using namespace std;

int maxProfit(vector<int>& prices) {
    // Write your code here
}

int main() {
    vector<int> prices = {7,1,5,3,6,4};
    cout << maxProfit(prices) << endl;
    return 0;
}`,
            java: `class Solution {
    public int maxProfit(int[] prices) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] prices = {7,1,5,3,6,4};
        System.out.println(sol.maxProfit(prices));
    }
}`,
            javascript: `function maxProfit(prices) {
    // Write your code here
}

// Test
console.log(maxProfit([7,1,5,3,6,4]));`
        },
        testCases: [
            { input: '[7,1,5,3,6,4]', expectedOutput: '5' },
            { input: '[7,6,4,3,1]', expectedOutput: '0' }
        ],
        constraints: [
            '1 <= prices.length <= 10^5',
            '0 <= prices[i] <= 10^4'
        ],
        examples: [
            {
                input: 'prices = [7,1,5,3,6,4]',
                output: '5',
                explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'
            }
        ]
    },
    {
        id: 'python-hello-world',
        title: 'Hello World',
        description: 'Write a program that prints "Hello, World!" to the console.',
        difficulty: 'Easy',
        topic: 'Basics',
        tags: ['basics', 'io'],
        starterCode: {
            python: `def helloWorld():
    # Write your code here
    pass

helloWorld()`,
            cpp: `#include <iostream>
using namespace std;

void helloWorld() {
    // Write your code here
}

int main() {
    helloWorld();
    return 0;
}`,
            java: `class Solution {
    public void helloWorld() {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        sol.helloWorld();
    }
}`,
            javascript: `function helloWorld() {
    // Write your code here
}

helloWorld();`
        },
        testCases: [
            { input: '', expectedOutput: 'Hello, World!' }
        ],
        constraints: [],
        examples: [
            {
                input: '',
                output: 'Hello, World!',
                explanation: 'Standard Hello World program.'
            }
        ]
    },
    {
        id: 'java-class-basics',
        title: 'Create a Class',
        description: 'Create a class named "Car" with a method "drive" that prints "Driving Tesla".',
        difficulty: 'Easy',
        topic: 'OOP',
        tags: ['oop', 'classes'],
        starterCode: {
            python: `class Car:
    def drive(self):
        # Write your code here
        pass

c = Car()
c.drive()`,
            cpp: `#include <iostream>
using namespace std;

class Car {
public:
    void drive() {
        // Write your code here
    }
};

int main() {
    Car c;
    c.drive();
    return 0;
}`,
            java: `class Car {
    public void drive() {
        // Write your code here
    }
}

class Solution {
    public static void main(String[] args) {
        Car c = new Car();
        c.drive();
    }
}`,
            javascript: `class Car {
    drive() {
        // Write your code here
    }
}

const c = new Car();
c.drive();`
        },
        testCases: [
            { input: '', expectedOutput: 'Driving Tesla' }
        ],
        constraints: [],
        examples: [
            {
                input: '',
                output: 'Driving Tesla',
                explanation: 'Method call prints the string.'
            }
        ]
    },
    {
        id: 'cpp-pointer-swap',
        title: 'Swap with Pointers',
        description: 'Write a function that swaps the values of two integers using pointers.',
        difficulty: 'Medium',
        topic: 'Pointers',
        tags: ['pointers', 'memory'],
        starterCode: {
            python: `# Python handles references automatically, but simulate swap
def swap(a, b):
    # Write your code here
    return a, b

print(swap(10, 20))`,
            cpp: `#include <iostream>
using namespace std;

void swap(int* a, int* b) {
    // Write your code here
}

int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    cout << x << " " << y << endl;
    return 0;
}`,
            java: `class Solution {
    // Java passes by value, so we swap array elements to simulate
    public void swap(int[] arr) {
        // Write your code here
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] arr = {10, 20};
        sol.swap(arr);
        System.out.println(arr[0] + " " + arr[1]);
    }
}`,
            javascript: `function swap(arr) {
    // Write your code here
}

const arr = [10, 20];
swap(arr);
console.log(arr[0], arr[1]);`
        },
        testCases: [
            { input: '', expectedOutput: '20 10' }
        ],
        constraints: [],
        examples: [
            {
                input: 'x=10, y=20',
                output: '20 10',
                explanation: 'Values are swapped.'
            }
        ]
    },
    {
        id: 'c-hello',
        title: 'Hello World in C',
        description: 'Write a C program that prints "Hello, World!" to the console.',
        difficulty: 'Easy',
        topic: 'Basics',
        tags: ['basics', 'io'],
        starterCode: {
            python: `print("Hello, World!")`,
            cpp: `#include <stdio.h>

int main() {
    // Write your code here
    return 0;
}`,
            java: `class Solution {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
            javascript: `console.log("Hello, World!");`
        },
        testCases: [
            { input: '', expectedOutput: 'Hello, World!' }
        ],
        constraints: [],
        examples: [
            {
                input: '',
                output: 'Hello, World!',
                explanation: 'Standard output.'
            }
        ]
    },
    {
        id: 'design-lb',
        title: 'Design a Load Balancer',
        description: 'Implement a simple Round Robin Load Balancer class.',
        difficulty: 'Medium',
        topic: 'System Design',
        tags: ['design', 'oop'],
        starterCode: {
            python: `class LoadBalancer:
    def __init__(self, servers):
        self.servers = servers
        self.index = 0
        
    def get_server(self):
        # Write your code here
        pass

lb = LoadBalancer(["Server1", "Server2", "Server3"])
print(lb.get_server())
print(lb.get_server())
print(lb.get_server())
print(lb.get_server())`,
            cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class LoadBalancer {
    vector<string> servers;
    int index;
public:
    LoadBalancer(vector<string> s) : servers(s), index(0) {}
    
    string getServer() {
        // Write your code here
    }
};

int main() {
    vector<string> s = {"Server1", "Server2", "Server3"};
    LoadBalancer lb(s);
    cout << lb.getServer() << endl;
    cout << lb.getServer() << endl;
    cout << lb.getServer() << endl;
    cout << lb.getServer() << endl;
    return 0;
}`,
            java: `import java.util.*;

class LoadBalancer {
    List<String> servers;
    int index;
    
    public LoadBalancer(List<String> servers) {
        this.servers = servers;
        this.index = 0;
    }
    
    public String getServer() {
        // Write your code here
        return "";
    }
}

class Solution {
    public static void main(String[] args) {
        List<String> s = Arrays.asList("Server1", "Server2", "Server3");
        LoadBalancer lb = new LoadBalancer(s);
        System.out.println(lb.getServer());
        System.out.println(lb.getServer());
        System.out.println(lb.getServer());
        System.out.println(lb.getServer());
    }
}`,
            javascript: `class LoadBalancer {
    constructor(servers) {
        this.servers = servers;
        this.index = 0;
    }
    
    getServer() {
        // Write your code here
    }
}

const lb = new LoadBalancer(["Server1", "Server2", "Server3"]);
console.log(lb.getServer());
console.log(lb.getServer());
console.log(lb.getServer());
console.log(lb.getServer());`
        },
        testCases: [
            { input: '', expectedOutput: 'Server1\nServer2\nServer3\nServer1' }
        ],
        constraints: [],
        examples: [
            {
                input: 'servers = ["Server1", "Server2", "Server3"]',
                output: 'Server1, Server2, Server3, Server1',
                explanation: 'Round robin cycles through the list.'
            }
        ]
    }
]
