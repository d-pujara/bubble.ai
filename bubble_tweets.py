import re
from typing import List, Dict

MAX_LENGTH = 280

sample_articles = [
    {
        'source': 'Left Daily',
        'title': 'Economic Policy Updates',
        'content': (
            'The new economic policy announced today aims to provide social support '\
            'to low-income families while increasing taxes on the wealthy. '\
            'Supporters argue this will reduce inequality. Opponents claim it '\
            'could slow economic growth by discouraging investment.'
        ),
        'perspective': 'left'
    },
    {
        'source': 'Right News',
        'title': 'Tax Reform Plans',
        'content': (
            'Officials unveiled a tax reform plan focusing on cutting taxes for '\
            'businesses in hopes of stimulating job creation. Critics warn the '\
            'policy favors corporations over workers and will increase the deficit.'
        ),
        'perspective': 'right'
    },
]

def _split_sentences(text: str) -> List[str]:
    """Very basic sentence tokenizer."""
    sentences = re.split(r'[\.!?]\s+', text.strip())
    return [s for s in sentences if s]

def summarize_text(text: str, max_length: int = MAX_LENGTH) -> str:
    """Return a naive summary using the first few sentences."""
    sentences = _split_sentences(text)
    summary = ''
    for sentence in sentences:
        if len(summary) + len(sentence) + 1 > max_length:
            break
        summary = summary + sentence.strip() + '. '
    return summary.strip()[:max_length]

def create_bubble(article: Dict[str, str]) -> str:
    """Create a bubble tweet style summary for an article."""
    summary = summarize_text(article['content'])
    bubble = f"[{article['perspective'].capitalize()}] {summary}"
    return bubble

if __name__ == '__main__':
    for article in sample_articles:
        bubble = create_bubble(article)
        print(f"\n{article['title']} - {article['source']}")
        print(bubble)
