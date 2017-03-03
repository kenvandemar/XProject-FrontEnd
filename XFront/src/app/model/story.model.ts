import { ChapterStory } from './chapterstory.model';
import { Author } from './author.model';
import { Genre } from './genre.model';

export interface Story {
            "StoryId": number,
            "StoryName": string,
            "StoryProgress": number,
            "StoryDescription": string,
            "StoryStatus": number,   
            "CreatedDate": Date,
            "LastEditedDate": Date
            "UserId": string,
            "Score": number,
            "RateCount": number,
            "Image": string,
            "Slug": string,         
            "Author": Author,
            "Genres":Genre[],
            "Chapters": ChapterStory[]
}