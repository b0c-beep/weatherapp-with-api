import os
import sys

def append_and_delete(original_file, target_file):
    try:
        # Step 1: Read the content from the original file
        with open(original_file, 'r') as file:
            content = file.read()
        
        # Step 2: Append the content to the target file
        with open(target_file, 'a') as file:
            file.write(content)
        
        # Step 3: Delete the original file
        os.remove(original_file)
        #print(f"Content appended to {target_file} and {original_file} has been deleted.")
    
    except FileNotFoundError as e:
        print(f"Error: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")

# Usage
#original_file = 'C:/Users/Mario/Downloads/database-openweatherapi.txt'
#target_file = 'D:/github projects/weatherapp-with-api/weatherapp-with-api/database.txt'
#append_and_delete(original_file, target_file)


if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python append_and_delete.py <original_file> <target_file>")
    else:
        original_file = sys.argv[1]
        target_file = sys.argv[2]
        append_and_delete(original_file, target_file)
