export const LANGUAGES = [
  "cpp",
  "java",
  "python",
  "javascript",
  "typescript",
] as const;

export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_CODE: Record<Language, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {

    return 0;
}
`,

  java: `class Solution {

}
`,

  python: `class Solution:
    pass
`,

  javascript: `function solve() {

}
`,

  typescript: `function solve(): void {

}
`,
};
