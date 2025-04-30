#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Directories to scan for logs
const directories = ["vue-frontend", "express-api"];

// File extensions to process
const extensions = [".js", ".ts", ".vue", ".jsx", ".tsx"];

// Function to check if a line has a "// keep" comment above it
function hasKeepComment(lines, index) {
  // Check the line above the current line
  if (index > 0) {
    const prevLine = lines[index - 1].trim();
    return prevLine === "// keep";
  }
  return false;
}

// Function to process a file
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    let modified = false;
    const newLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check if this line contains a console.log statement
      if (line.includes("console.log(") && !hasKeepComment(lines, i)) {
        // Skip this line (don't add it to newLines)
        modified = true;
        console.log(`Removing log in ${filePath}:${i + 1}`);
      } else {
        newLines.push(line);
      }
    }

    // Write the file back if it was modified
    if (modified) {
      fs.writeFileSync(filePath, newLines.join("\n"), "utf8");
      console.log(`Updated ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

// Function to recursively find files with specific extensions
function findFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (
      stat.isDirectory() &&
      !filePath.includes("node_modules") &&
      !filePath.includes(".git")
    ) {
      findFiles(filePath);
    } else if (
      stat.isFile() &&
      extensions.some((ext) => filePath.endsWith(ext))
    ) {
      processFile(filePath);
    }
  });
}

// Main execution
console.log("Starting log cleanup...");

// Process each directory
directories.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`Processing directory: ${dir}`);
    findFiles(dir);
  } else {
    console.warn(`Directory not found: ${dir}`);
  }
});

console.log("Log cleanup completed!");
