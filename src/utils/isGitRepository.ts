import type { SimpleGit } from 'simple-git'
import simpleGit from 'simple-git'

export async function isGitRepository(): Promise<boolean> {
  const git: SimpleGit = simpleGit()
  try {
    await git.checkIsRepo()
    return true
  }
  catch (error) {
    return false
  }
}
