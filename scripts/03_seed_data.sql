-- Seed data for Acroeduvos platform

-- Insert sample courses
INSERT INTO public.courses (id, title, description, level, duration, is_published) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Data Structures & Algorithms', 'Master DSA with 200+ problems from Google, Microsoft, Amazon interviews', 'Beginner to Advanced', '12 weeks', true),
('550e8400-e29b-41d4-a716-446655440002', 'System Design Mastery', 'Learn to design scalable systems with real-world case studies', 'Intermediate', '8 weeks', true),
('550e8400-e29b-41d4-a716-446655440003', 'Full Stack Web Development', 'Build modern web applications with React, Node.js, and cloud deployment', 'Beginner', '16 weeks', true),
('550e8400-e29b-41d4-a716-446655440004', 'Machine Learning Fundamentals', 'Dive into AI/ML with hands-on projects and real datasets', 'Intermediate', '10 weeks', true),
('550e8400-e29b-41d4-a716-446655440005', 'Competitive Programming', 'Master algorithmic thinking with CodeChef and Codeforces style problems', 'Advanced', '14 weeks', true),
('550e8400-e29b-41d4-a716-446655440006', 'Database Design & SQL', 'Master database concepts with real-world schema design', 'Beginner to Intermediate', '6 weeks', true);

-- Insert course modules for DSA course
INSERT INTO public.course_modules (id, course_id, title, description, order_index, duration) VALUES
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Arrays & Strings', 'Master array manipulation and string processing', 1, '2 weeks'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Linked Lists', 'Master linked list operations and algorithms', 2, '1.5 weeks'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Trees & Graphs', 'Explore tree traversals and graph algorithms', 3, '3 weeks');

-- Insert module topics
INSERT INTO public.module_topics (id, module_id, title, description, order_index) VALUES
('750e8400-e29b-41d4-a716-446655440001', '650e8400-e29b-41d4-a716-446655440001', 'Two Pointer Technique', 'Learn the two pointer approach for array problems', 1),
('750e8400-e29b-41d4-a716-446655440002', '650e8400-e29b-41d4-a716-446655440001', 'Sliding Window', 'Master sliding window technique for substring problems', 2),
('750e8400-e29b-41d4-a716-446655440003', '650e8400-e29b-41d4-a716-446655440002', 'Basic Operations', 'Fundamental linked list operations', 1),
('750e8400-e29b-41d4-a716-446655440004', '650e8400-e29b-41d4-a716-446655440003', 'Binary Trees', 'Binary tree traversal and manipulation', 1);

-- Insert problems
INSERT INTO public.problems (id, slug, title, description, difficulty, category, acceptance_rate, time_complexity, space_complexity, hints, examples, constraints) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'two-sum', 'Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.', 'Easy', 'Array', 49.1, 'O(n)', 'O(n)', 
'["A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it''s best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.", "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?", "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"]'::jsonb,
'[{"input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."}, {"input": "nums = [3,2,4], target = 6", "output": "[1,2]", "explanation": "Because nums[1] + nums[2] == 6, we return [1, 2]."}]'::jsonb,
ARRAY['2 ≤ nums.length ≤ 10⁴', '-10⁹ ≤ nums[i] ≤ 10⁹', '-10⁹ ≤ target ≤ 10⁹', 'Only one valid answer exists.']),

('850e8400-e29b-41d4-a716-446655440002', 'three-sum', '3Sum', 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.

Notice that the solution set must not contain duplicate triplets.', 'Medium', 'Array', 32.4, 'O(n²)', 'O(1)', 
'["So, we essentially need to find three numbers x, y, and z such that they add up to the given value. If we fix one of the numbers say x, we are left with the two-sum problem at hand!", "For the two-sum problem, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?", "The second train of thought for two-sum is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"]'::jsonb,
'[{"input": "nums = [-1,0,1,2,-1,-4]", "output": "[[-1,-1,2],[-1,0,1]]", "explanation": "nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2]. Notice that the order of the output and the order of the triplets does not matter."}]'::jsonb,
ARRAY['3 ≤ nums.length ≤ 3000', '-10⁵ ≤ nums[i] ≤ 10⁵']),

('850e8400-e29b-41d4-a716-446655440003', 'container-water', 'Container With Most Water', 'You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.', 'Medium', 'Two Pointers', 54.2, 'O(n)', 'O(1)', 
'["If you simulate the problem, it will be O(n^2) which is not efficient.", "Try to use two-pointers. Set one pointer to the left and one to the right of the array. Always move the pointer that points to the lower line.", "How does moving the pointer that points to the lower line work? How does it make sense?"]'::jsonb,
'[{"input": "height = [1,8,6,2,5,4,8,3,7]", "output": "49", "explanation": "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49."}]'::jsonb,
ARRAY['n == height.length', '2 ≤ n ≤ 10⁵', '0 ≤ height[i] ≤ 10⁴']);

-- Insert problem companies
INSERT INTO public.problem_companies (problem_id, company_name) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'Google'),
('850e8400-e29b-41d4-a716-446655440001', 'Amazon'),
('850e8400-e29b-41d4-a716-446655440001', 'Microsoft'),
('850e8400-e29b-41d4-a716-446655440001', 'Facebook'),
('850e8400-e29b-41d4-a716-446655440001', 'Apple'),
('850e8400-e29b-41d4-a716-446655440002', 'Facebook'),
('850e8400-e29b-41d4-a716-446655440002', 'Apple'),
('850e8400-e29b-41d4-a716-446655440002', 'Adobe'),
('850e8400-e29b-41d4-a716-446655440003', 'Amazon'),
('850e8400-e29b-41d4-a716-446655440003', 'Bloomberg'),
('850e8400-e29b-41d4-a716-446655440003', 'Goldman Sachs');

-- Insert problem solutions
INSERT INTO public.problem_solutions (problem_id, language, starter_code, solution_code, explanation, approach, time_complexity, space_complexity) VALUES
('850e8400-e29b-41d4-a716-446655440001', 'python', 'def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass', 'def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []', 'The brute force approach is to loop through each element x and find if there is another value that equals to target - x. This takes O(n²) time.

We can reduce the time complexity from O(n²) to O(n) by trading space for speed. A hash map is well suited for this purpose because it supports fast lookup in near constant time.

While we are iterating and inserting elements into the hash map, we also look back to check if current element''s complement already exists in the hash map. If it exists, we have found a solution and return the indices immediately.', 'Hash Map', 'O(n)', 'O(n)'),

('850e8400-e29b-41d4-a716-446655440001', 'javascript', '/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};', 'var twoSum = function(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
};', 'Same approach as Python but using JavaScript Map for hash table functionality.', 'Hash Map', 'O(n)', 'O(n)');

-- Link problems to topics
INSERT INTO public.topic_problems (topic_id, problem_id, order_index) VALUES
('750e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 1),
('750e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440002', 2),
('750e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440003', 3);
