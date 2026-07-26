export const LANGUAGES = ["cpp", "java", "python", "typescript"] as const;

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

  typescript: `function solve(): void {

}
`,
};
